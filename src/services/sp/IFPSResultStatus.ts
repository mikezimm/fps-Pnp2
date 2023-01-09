
export type IFPSResultStatus = 'Unknown' | 'Success' | 'Error' | 'NoWeb' | 'NoList' | 'NoItem' | 'NoUser' | 'RuleBreak';

export const FPSResultCommonErrors: IFPSResultStatus[] = [ 'NoWeb' , 'NoList' , 'NoItem' , 'NoUser' ];