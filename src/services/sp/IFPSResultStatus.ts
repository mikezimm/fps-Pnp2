
export type IFPSResultStatus = 'Unknown' | 'Success' | 'Error' | 'NoWeb' | 'NoList' | 'NoItem' | 'NoUser' | 'NoGroup' | 'RuleBreak';

export const FPSResultCommonErrors: IFPSResultStatus[] = [ 'NoWeb' , 'NoList' , 'NoItem' , 'NoUser' ,'NoGroup' ];