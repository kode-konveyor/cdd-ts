import dts from 'rollup-plugin-dts';
export default [
    {
        input: 'dist/src/index.d.ts',
        output: {
            file: 'src/index.d.ts'
        },
        plugins: [dts()]
    },
    {
        input: 'dist/src/index.js',
        output: {
            file: 'src/index.js'
        }
    }
]