/**
 * Utility functions to render different node types as HTML elements.
 */

function renderText(node, format) {
  if (node.format?.variants?.length > 0) {
    return node.format.variants.reduce((previousValue, currentValue) => {
      const formatted = format[currentValue]?.(previousValue);
      return formatted || previousValue;
    }, node.value);
  }
  return document.createTextNode(node.value);
}

function renderImage(node) {
  const mimeType = node.data?.mimetype;
  if (mimeType && mimeType.startsWith('image')) {
    const img = document.createElement('img');
    img.src = node.data.path;
    img.alt = 'reference';
    return img;
  }
  return null;
}

function createElement(tag, children) {
  const element = document.createElement(tag);
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child) element.appendChild(child);
      });
    } else if (children.nodeType) {
      element.appendChild(children);
    }
  }
  return element;
}

const defaultHeaderStyle = {
  h1: (node, children) => createElement('h1', children),
  h2: (node, children) => createElement('h2', children),
  h3: (node, children) => createElement('h3', children),
};

const defaultNodeMap = {
  header: (node, children, style) => style[node.style]?.(node, children),
  paragraph: (node, children) => createElement('p', children),
  'unordered-list': (node, children) => createElement('ul', children),
  'ordered-list': (node, children) => createElement('ol', children),
  'list-item': (node, children) => createElement('li', children),
  table: (node, children) => createElement('table', children),
  'table-body': (node, children) => createElement('tbody', children),
  'table-row': (node, children) => createElement('tr', children),
  'table-data': (node, children) => createElement('td', children),
  link: (node) => {
    const link = document.createElement('a');
    link.href = node.data.href;
    link.target = node.data.target;
    link.textContent = node.value;
    return link;
  },
  text: (node, format) => renderText(node, format),
  reference: (node) => renderImage(node),
};

function createFormattedText(tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  return element;
}

const defaultTextFormat = {
  bold: (value) => createFormattedText('b', value),
  italic: (value) => createFormattedText('i', value),
  underline: (value) => createFormattedText('u', value),
};

function renderNodeList(childNodes, options) {
  if (Array.isArray(childNodes) && options) {
    // eslint-disable-next-line no-use-before-define
    return childNodes.map((node) => renderNode(node, options)).filter((node) => node !== null);
  }
  return [];
}

function renderNode(node, options) {
  const { nodeMap, textFormat, headerStyle } = options;

  if (!node || !options) {
    return null;
  }

  const children = node.content ? renderNodeList(node.content, options) : null;

  if (node.nodeType === 'header') {
    return nodeMap[node.nodeType]?.(node, children, headerStyle);
  }

  if (node.nodeType === 'text') {
    return nodeMap[node.nodeType]?.(node, textFormat);
  }

  return nodeMap[node.nodeType]?.(node, children) ?? null;
}

export default function mapJsonRichText(json, options = {}) {
  const renderedNodes = renderNodeList(json, {
    nodeMap: {
      ...defaultNodeMap,
      ...options.nodeMap,
    },
    textFormat: {
      ...defaultTextFormat,
      ...options.textFormat,
    },
    headerStyle: {
      ...defaultHeaderStyle,
      ...options.headerStyle,
    },
  });

  const fragment = document.createDocumentFragment();
  renderedNodes.forEach((node) => {
    if (node) fragment.appendChild(node);
  });

  return fragment;
}
