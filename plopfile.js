const commonComponentDir = "common/activity";

const adminAttrsListDefineDir = "admin/src/components/editor/attr/activity";
const adminAttrsListDefinePath = "admin/src/components/editor/tools/attrsListDefine.js";
const adminComponentsDefinePath = "admin/src/components/editor/main/componentsDefine.js";

const webComponentDir = "web/components/activity";
const webServiceDir = "web/service";
const webStoreDir = "web/store/modules/activity";
const webComponentsDefinePath = "web/components/common/componentsDefine.js";

function modifyComponentsMap(targetFilePath, componentPath) {
  return {
    type: 'modify',
    path: targetFilePath,
    pattern: /const\s+componentsMap\s*=\s*\{([^}]+)\}/,
    template: `const componentsMap = {$1    {{componentName}}: () => import('${componentPath}'),\n}`,
  };
}

function modifyAttrMap() {
  return {
    type: 'modify',
    path: adminAttrsListDefinePath,
    pattern: /(const\s+attrMap\s*=\s*\{)/,
    template: "$1\n    {{ componentName }}: {\n" +
      "        componentList: [\n" +
      "            {\n" +
      "                name: '{{ componentName }}',\n" +
      "                attrs: {}\n" +
      "            }\n" +
      "        ]\n" +
      "    },\n"
  };
}

module.exports = function (plop) {
  plop.setGenerator("resource", {
    description: "Generating a new activity resource",
    prompts: [
      {
        type: "input",
        name: "activityName",
        message: "Activity name:",
      },
      {
        type: "input",
        name: "componentName",
        message: "Component name:",
      },
    ],
    actions: [
      /** 
       * common
       * */
      // creating activity directory if it doesn't exist
      {
        type: 'addMany',
        destination: `${commonComponentDir}/{{activityName}}`,
        templateFiles: 'plop-templates/activity-directory/**',
        base: 'plop-templates/activity-directory',
      },
      // generating component
      {
        type: "add",
        path: `${commonComponentDir}/{{activityName}}/{{componentName}}.vue`,
        templateFile: "plop-templates/component.vue.hbs",
      },

      /**
       * admin
       */
      // generating component attribute
      {
        type: "add",
        path: `${adminAttrsListDefineDir}/{{activityName}}/{{componentName}}.vue`,
        templateFile: "plop-templates/component-attr.vue.hbs",
      },
      modifyAttrMap(),
      modifyComponentsMap(adminAttrsListDefinePath, `~/editor/attr/activity/{{activityName}}/{{componentName}}.vue`),
      modifyComponentsMap(adminComponentsDefinePath, `$root/${commonComponentDir}/{{activityName}}/{{componentName}}.vue`),

      /**
       * web
       */
      // generating component
      {
        type: "add",
        path: `${webComponentDir}/{{activityName}}/{{componentName}}.vue`,
        templateFile: "plop-templates/component-web.vue.hbs",
      },
      // generating service
      {
        type: "add",
        path: `${webServiceDir}/{{activityName}}.ts`,
        templateFile: "plop-templates/component-service.ts.hbs",
        skipIfExists: true,
      },
      // generating store
      {
        type: "add",
        path: `${webStoreDir}/{{activityName}}/index.ts`,
        templateFile: "plop-templates/component-store.ts.hbs",
        skipIfExists: true,
      },
      modifyComponentsMap(webComponentsDefinePath, `@/components/activity/{{activityName}}/{{componentName}}.vue`),
    ],
  });
};
