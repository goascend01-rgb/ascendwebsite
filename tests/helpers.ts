import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

export const ROOT = join(__dirname, "..");
export const SRC = join(ROOT, "src");

const SOURCE_EXTENSIONS = [".ts", ".tsx"];

export type SourceFile = { path: string; rel: string; content: string };

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (SOURCE_EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

/** Every TypeScript source file under src/, with POSIX-style relative paths. */
export function sourceFiles(subdir = ""): SourceFile[] {
  const base = subdir ? join(SRC, subdir) : SRC;
  return walk(base).map((path) => ({
    path,
    rel: relative(ROOT, path).split(sep).join("/"),
    content: readFileSync(path, "utf8"),
  }));
}

/** Files that belong to the staffing business, where human service
    vocabulary (eligibility verification, prior authorization, claim status)
    is true because people do that work. */
export function isStaffingFile(rel: string): boolean {
  return (
    rel.startsWith("src/app/staffing/") ||
    rel === "src/lib/staffing.ts" ||
    rel === "src/components/home/StaffingSection.tsx"
  );
}

/** Blank out comments while preserving every byte offset, so a guard that
    scans for a forbidden claim does not trip on a comment explaining why
    that claim is forbidden. Offsets are preserved so `locate` still reports
    the right line. */
export function withoutComments(file: SourceFile): SourceFile {
  const blanked = file.content.replace(
    /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g,
    (match) => match.replace(/[^\n]/g, " ")
  );
  return { ...file, content: blanked };
}

/** Report a failure with the file and the offending line, so a guard tells
    you where the problem is rather than only that there is one. */
export function locate(file: SourceFile, index: number): string {
  const before = file.content.slice(0, index);
  const line = before.split("\n").length;
  const lineText = file.content.split("\n")[line - 1]?.trim() ?? "";
  return `${file.rel}:${line}  ${lineText.slice(0, 140)}`;
}

export function findAll(
  file: SourceFile,
  pattern: RegExp
): { index: number; match: string }[] {
  const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
  const hits: { index: number; match: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(file.content)) !== null) {
    hits.push({ index: m.index, match: m[0] });
    if (m[0] === "") re.lastIndex += 1;
  }
  return hits;
}

/** JSX text that renders as a heading: h1 and h2 elements, plus the `title`
    prop of the shared SectionHeader and PageHero components. */
export function headingStrings(file: SourceFile): string[] {
  const out: string[] = [];

  for (const m of file.content.matchAll(/<h([12])[^>]*>([\s\S]*?)<\/h\1>/g)) {
    out.push(m[2]);
  }
  for (const m of file.content.matchAll(/\btitle=\{([\s\S]*?)\}\s*\n/g)) {
    out.push(m[1]);
  }
  for (const m of file.content.matchAll(/\btitle:\s*"([^"]*)"/g)) {
    out.push(m[1]);
  }

  return out.map((s) => s.replace(/<[^>]+>/g, " "));
}
