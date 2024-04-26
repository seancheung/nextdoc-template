import frontmatter from "remark-frontmatter";
import { parse as parseToml } from "toml";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";

/** @typedef {{name?: string; merge?: boolean}} Options */

/** @type {import('unified').Plugin} */
export default function remarkFrontmatter(options) {
  const parsers = {
    yaml: parseYaml,
    toml: parseToml,
  };
  /** @type {Options} */
  const { name = "frontmatter", merge = true } = options || {};
  frontmatter.call(this, ["yaml", "toml"]);
  return (tree, file) => {
    visit(tree, ["yaml", "toml"], (node) => {
      if (!merge && file.data[name]) {
        return;
      }
      file.data[name] ||= {};
      Object.assign(file.data[name], parsers[node.type](node.value));
    });
  };
}
