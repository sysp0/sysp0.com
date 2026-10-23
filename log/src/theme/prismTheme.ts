import type { PrismTheme } from "prism-react-renderer";

// Code theme built from the brand tokens: carbon background, orange-light keywords, cream strings.
export const prismTheme: PrismTheme = {
  plain: { color: "#DCE4F2", backgroundColor: "#10316B" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#8FA2C8", fontStyle: "italic" } },
    { types: ["punctuation", "operator"], style: { color: "#B9C5DD" } },
    { types: ["keyword", "selector", "atrule", "important", "tag"], style: { color: "#FF9161" } },
    { types: ["string", "char", "attr-value", "inserted"], style: { color: "#F5F4EF" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#FFC3A6" } },
    { types: ["function", "class-name", "builtin", "attr-name"], style: { color: "#BCD0F7" } },
    { types: ["variable", "property", "parameter"], style: { color: "#FFFFFF" } },
    { types: ["deleted"], style: { color: "#FF9161", textDecorationLine: "line-through" } },
  ],
};
