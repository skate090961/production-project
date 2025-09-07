import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const UIPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUIDir = project.getDirectory(UIPath);
const componentsDirs = sharedUIDir?.getDirectories();

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

// create index.ts in shared/ui
componentsDirs?.forEach((dir) => {
    const indexFilePath = `${dir.getPath()}/index.ts`;
    const indexFile = dir.getSourceFile(indexFilePath);
    if (!indexFile) {
        const srcCode = `export * from './${dir.getBaseName()}';`;
        const file = dir.createSourceFile(
            indexFilePath,
            srcCode,
            { overwrite: true },
        );

        file.save();
    }
});

// refactor project
files.forEach((srcFile) => {
    const importDeclaration = srcFile.getImportDeclarations();
    importDeclaration.forEach((i) => {
        const value = i.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUISlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISlice) {
            const result = valueWithoutAlias
                .split('/')
                .slice(0, 3)
                .join('/');

            i.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
