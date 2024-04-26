import { visit } from "unist-util-visit";

/** @typedef {{suffix?: string|null; target?: string|null; rel?: string|null;}} Options */

/** @type {import('unified').Plugin} */
export default function remarkExternalLink(options) {
  return (tree, file) => {
    /** @type {Options} */
    const {
      suffix = "↗",
      target = "_blank",
      rel = "noopener",
    } = options || {};
    visit(tree, "link", (node) => {
      if (!node.url?.startsWith("http")) {
        return;
      }
      if (suffix) {
        node.children.push({ type: "text", value: suffix });
      }
      node.data ||= {};
      node.data.hProperties ||= {};
      if (target) {
        node.data.hProperties.target = target;
      }
      if (rel) {
        node.data.hProperties.rel = rel;
      }
    });
  };
}
