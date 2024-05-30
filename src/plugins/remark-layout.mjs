import { valueToEstree } from "estree-util-value-to-estree";
import { visit } from "unist-util-visit";

/** @typedef {{path: string; title: string}} NavLink */
/** @typedef {{title: string; children: NavLink[]}} NavGroup */
/** @typedef {{layoutWrapper: string; pages: NavGroup[]}} Options */

/** @type {import('unified').Plugin} */
export default function remarkLayout(options) {
  /** @type {Options} */
  const { layoutWrapper, pages } = options || {};
  return (tree, file) => {
    const wrapperStr = `import layoutWrapper from "${layoutWrapper}";import pages from "${pages}";export default layoutWrapper(${JSON.stringify(file.data)}, pages);`;
    const data = valueToEstree(file.data);
    const estree = {
      type: "Program",
      sourceType: "module",
      body: [
        {
          type: "ImportDeclaration",
          specifiers: [
            {
              type: "ImportDefaultSpecifier",
              local: {
                type: "Identifier",
                name: "layoutWrapper",
              },
            },
          ],
          source: {
            type: "Literal",
            value: layoutWrapper,
            raw: `"${layoutWrapper}"`,
          },
        },
        {
          type: "ImportDeclaration",
          specifiers: [
            {
              type: "ImportDefaultSpecifier",
              local: {
                type: "Identifier",
                name: "pages",
              },
            },
          ],
          source: {
            type: "Literal",
            value: pages,
            raw: `"${pages}"`,
          },
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "layoutWrapper",
            },
            arguments: [
              data,
              {
                type: "Identifier",
                name: "pages",
              },
            ],
          },
        },
      ],
    };
    visit(tree, "root", (node) => {
      node.children.push({
        type: "mdxjsEsm",
        value: wrapperStr,
        data: {
          estree,
        },
      });
    });
  };
}
