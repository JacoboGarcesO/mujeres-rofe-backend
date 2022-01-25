export class StringsUtils {
  static capitalize(text: string): string {
    const textLower = text?.toString().toLowerCase();
    const textCapitalize = textLower?.charAt(0).toUpperCase() + textLower?.slice(1);
    return textCapitalize;
  }
}
