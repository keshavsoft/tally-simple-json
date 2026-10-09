/**
 * Tally Simple JSON v31 Types
 */

export declare function company(): Promise<any>;
export declare function masters(path: string, company: string): Promise<any>;
export declare function vouchers(path: string, company: string, fromDate: string, toDate: string): Promise<any>;

declare const _default: {
    company: typeof company;
    masters: typeof masters;
    vouchers: typeof vouchers;
};

export default _default;
