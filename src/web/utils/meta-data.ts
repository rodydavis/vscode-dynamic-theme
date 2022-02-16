export function convertComponents<T extends Component>(components: T[]) {
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    const args: string[] = [];
    for (const part of component.route.split("/")) {
      if (part.startsWith(":")) {
        args.push(part.slice(1));
      }
    }
    component.route = component.route.toLowerCase();
    component.args = args;
    // Remove extension
    const file = component.path;
    let idx = file.length - 1;
    while (file[idx] !== ".") {
      idx--;
    }
    const ext = file.slice(idx + 1, file.length);
    let relativePath = component.path.split("pages")[1];
    relativePath = relativePath.replace(`.${ext}`, "");
    component.ext = ext;
    component.alias = `route${i}`;
    component.relativePath = "pages" + relativePath;
    const route = `${component.route}`;
    if (route === "") {
      continue;
    }
    let parentRoute: string | undefined;
    if (route.endsWith("/")) {
      parentRoute = route.slice(0, -1);
    } else {
      let implicitIndex = false;
      const implicitRoute = route + "/";
      for (const c of components) {
        if (c.route === implicitRoute) {
          implicitIndex = true;
          break;
        }
      }
      component.implicitIndex = implicitIndex;
      // /settings/admin --> /settings --> ""
      // /settings/ --> /settings --> ""
      // /settings --> ""
      parentRoute = route.split("/").slice(0, -1).join("/");
    }
    const hasParentRoute = components.find((c) => c.route === parentRoute);
    if (hasParentRoute !== undefined && parentRoute !== "/") {
      component.parentRoute = parentRoute;
    } else if (parentRoute === "/") {
      const rootComponent = components.find((c) => c.route === "");
      if (rootComponent) {
        component.parentRoute = "";
      }
    }
  }

  return components
    .sort((a, b) => {
      if (a.route < b.route) {
        return -1;
      }
      if (a.route > b.route) {
        return 1;
      }
      return 0;
    })
    .reverse();
}

export function getComponentTree<T extends Component>(
  component: T,
  components: T[]
) {
  const tree: T[] = [component];

  while (component.parentRoute) {
    const parent = components.find((c) => c.route === component.parentRoute);
    if (parent) {
      tree.push(parent);
      component = parent;
    } else {
      break;
    }
  }

  // Add root
  const root = components.find((c) => c.route === "");
  if (root && root !== component) {
    tree.push(root);
  }

  return tree.reverse();
}

export interface Component {
  route: string;
  name: string;
  path: string;
  ext?: string;
  relativePath?: string;
  alias?: string;
  implicitIndex?: boolean;
  parentRoute?: string;
  args: string[];
}
