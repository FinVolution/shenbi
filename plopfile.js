module.exports = function (plop) {
  plop.setGenerator("resource", {
    description: "Generating a new activity resource",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Activity name:",
      },
    ],
    actions: [
      /** 
       * common
       * */
      // generating component
      {
        type: "add",
        path: "common/activity/{{name}}/{{name}}.vue",
        templateFile: "plop-templates/component.vue.hbs",
      },

      /**
       * admin
       */
      // update componentsDefine
      {
        type: 'modify',
        path: 'admin/src/components/editor/main/componentsDefine.js',
        pattern: /const\s+componentsMap\s*=\s*\{([^}]+)\}/,
        template: `const componentsMap = {$1    {{name}}: () => import('$root/common/activity/{{name}}/{{name}}.vue'),\n}`,
      },
      // generating component attribute
      {
        type: "add",
        path: "admin/src/components/editor/attr/activity/{{name}}/{{name}}.vue",
        templateFile: "plop-templates/component-attr.vue.hbs",
      },
      // update attrsListDefine
      {
        type: 'modify',
        path: 'admin/src/components/editor/tools/attrsListDefine.js',
        pattern: /const\s+componentsMap\s*=\s*\{([^}]+)\}/,
        template: `const componentsMap = {$1    {{name}}: () => import('~/editor/attr/activity/{{name}}/{{name}}.vue'),\n}`,
      },
      {
        type: 'modify',
        path: 'admin/src/components/editor/tools/attrsListDefine.js',
        pattern: /(const\s+attrMap\s*=\s*\{)/,
        template: "$1\n    {{ name }}: {\n" +
                  "        componentList: [\n" +
                  "            {\n" +
                  "                name: '{{ name }}',\n" +
                  "                attrs: {}\n" +
                  "            }\n" +
                  "        ]\n" +
                  "    },\n"
      },

      /**
       * web
       */
      // generating component
      {
        type: "add",
        path: "web/components/activity/{{name}}/{{name}}.vue",
        templateFile: "plop-templates/component-web.vue.hbs",
      },
      // update componentsDefine
      {
        type: 'modify',
        path: 'web/components/common/componentsDefine.js',
        pattern: /const\s+componentsMap\s*=\s*\{([^}]+)\}/,
        template: `const componentsMap = {$1    {{name}}: () => import('@/components/activity/{{name}}/{{name}}.vue'),\n}`,
      },
      // generating service
      {
        type: "add",
        path: "web/service/{{name}}.ts",
        templateFile: "plop-templates/component-service.ts.hbs",
      },
      // generating store
      {
        type: "add",
        path: "web/store/modules/activity/{{name}}/index.ts",
        templateFile: "plop-templates/component-store.ts.hbs",
      },
    ],
  });
};
