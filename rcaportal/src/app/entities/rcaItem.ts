export class RCAItem {
    public ID = '';
    public Header = '';
    public Submitter = '';
    public KeyWords: Array<string> = [];
    public RootCauseCR = '';
    public ImpactedProduct = '';
    public FixVersion = '';
    public Component = '';
    public ReadoutLevel = 'Level-2';
    public RootCauseAnalyze = '';
    public RequirementCorrectAndPrevention: CorrectAndPrevention = new CorrectAndPrevention();
    public DevCorrectAndPrevention: CorrectAndPrevention = new CorrectAndPrevention();
    public TestCorrectAndPrevention: CorrectAndPrevention = new CorrectAndPrevention();
    public Attachments: Array<Attachment> = [];
    public IsManagable = false;
}

export class CorrectAndPrevention{
    public RootCause = '';
    public Correction = '';
    public Prevention = '';
}

export class Attachment{
    public ID = '';
    public Type = '';
    public Name = '';
}
