export const Module = (param: { provides: any[] }) => {
    return (target: any) => {
        console.log(`Module ${target.name} registered`);
    };
};
