export const Module = (param: { provides: any[] }) => {
    return (target: any) => {
        target.prototype.provides = param.provides;
    };
};
