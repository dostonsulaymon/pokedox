export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}
