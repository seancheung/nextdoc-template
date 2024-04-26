import { toString } from "mdast-util-to-string";
import { spinalcase } from "stringcase";
import { visit } from "unist-util-visit";

/** @typedef {{id: string; title: string; level: number}} Heading  */
/** @typedef {{startDepth?:number; maxDepth?: number; prefix?: string}} Options */

/** @type {import('unified').Plugin} */
export default function remarkHeading(options) {
  return (tree, file) => {
    /**
     * @param {string} id
     * @param {Heading[]} headings
     * @returns {boolean}
     */
    const hasConflict = (id, headings) => {
      return headings.some(
        (e) => e.id === id || (e.children && hasConflict(id, e.children)),
      );
    };
    /** @type {Options} */
    const { startDepth = 2, maxDepth = 3, prefix = "" } = options || {};
    visit(tree, "heading", (node) => {
      if (node.depth < startDepth || node.depth > maxDepth) {
        return;
      }
      /** @type {Heading[]} */
      const headings = (file.data.headings ||= []);
      const title = toString(node);
      let baseId = prefix + spinalcase(title);
      let id = baseId;
      let postfix = 1;
      while (hasConflict(id, headings)) {
        id = `${baseId}-${++postfix}`;
      }
      /** @type {Heading} */
      const heading = {
        id,
        title,
        level: node.depth - 1,
      };
      headings.push(heading);
      node.data ||= {};
      node.data.hProperties ||= {};
      node.data.id = node.data.hProperties.id = id;
    });
  };
}
