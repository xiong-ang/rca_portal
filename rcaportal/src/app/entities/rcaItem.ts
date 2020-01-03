export class RCAItem {
    public ID: string;
    public Header: string;
    public Submitter: string;
    public KeyWords: Array<string>;
    public RootCauseCR: string;
    public ImpactedProduct: string;
    public FixVersion: string;
    public Component: string;
    public IsReadout: string;
    public RootCauseAnalyze: string;
    public RequirementCorrectAndPrevention: CorrectAndPrevention;
    public DevCorrectAndPrevention: CorrectAndPrevention;
    public TestCorrectAndPrevention: CorrectAndPrevention;
    public Attachments: Array<Attachment>;
    public IsManagable: boolean;
}

export class CorrectAndPrevention{
    public RootCause: string;
    public Correction: string;
    public Prevention: string;
}

export class Attachment{
    public ID: string;
    public Type: string;
    public Name: string;
}