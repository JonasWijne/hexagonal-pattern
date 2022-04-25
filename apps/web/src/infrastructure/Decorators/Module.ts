export const Module = (param: { provides: any[]; imports: any[] }) => {
    return (target: any) => {
        console.log(`Module ${target.name} registered`);
    };
};
