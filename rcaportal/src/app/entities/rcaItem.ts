export class RCAItem {
    public ID: string;
    public Header: string;
    public Submitter: string;
    public KeyWords: Array<string>;
    public RootCauseCR: string;
    public ImpactedProduct: string;
    public FixVersion: string;
    public Component: string;
    public IsReadout: boolean;
    public RootCauseAnalyze: string;
    public RequirementCorrectAndPrevention: CorrectAndPrevention;
    public DevCorrectAndPrevention: CorrectAndPrevention;
    public TestCorrectAndPrevention: CorrectAndPrevention;
}

export class CorrectAndPrevention{
    public RootCause: string;
    public Correction: string;
    public Prevention: string;
}