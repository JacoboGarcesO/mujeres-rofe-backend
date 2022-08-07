export class StringsUtils {
  static capitalize(text: string): string {
    if (!text) { return ''; }
    const textLower = text.toString().toLowerCase();
    return textLower.charAt(0).toUpperCase() + textLower.slice(1);
  }
}
