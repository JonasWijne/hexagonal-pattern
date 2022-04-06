module.exports = {
    env: {
        node: true,
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        '@vue/typescript/recommended',
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
        'plugin:typescript-enum/recommended',
    ],
    ignorePatterns: ['dist', '**/assets/*'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
    },
};
