import { visit } from "unist-util-visit";

/** @typedef {{classNames: {[x: string]: string[]}}} Options */

/** @type {import('unified').Plugin} */
export default function remarkClassNames(options) {
  return (tree, file) => {
    /** @type {Options} */
    const { classNames = {} } = options || {};
    const keys = Object.keys(classNames);
    if (keys.length) {
      visit(tree, keys, (node) => {
        node.data ||= {};
        node.data.hProperties ||= {};
        node.data.hProperties.className ||= [];
        node.data.hProperties.className.push(...classNames[node.type]);
      });
    }
  };
}
