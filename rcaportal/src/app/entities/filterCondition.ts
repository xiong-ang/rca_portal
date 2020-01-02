export class FilterCondition {
    public ID: string;
    public ImpactedProduct: string;
    public FixVersion: string;
    public Component: string;
    public Submitter: string;
    public RootCauseCR: string;
    public IsReadout: boolean;
    public Keywords: Array<string>;

    public GetFilterEntity() {
        let result = new FilterEntity();
        if (this.ID) result.ConditionPairs.set('ID', this.ID);
        if (this.ImpactedProduct) result.ConditionPairs.set('Impacted Product', this.ImpactedProduct);
        if (this.FixVersion) result.ConditionPairs.set('Fix Version', this.FixVersion);
        if (this.Component) result.ConditionPairs.set('Component', this.Component);
        if (this.Submitter) result.ConditionPairs.set('Submitter', this.Submitter);
        if (this.RootCauseCR) result.ConditionPairs.set('Root Cause CR', this.RootCauseCR);
        if (this.IsReadout !== null) result.ConditionPairs.set('Is Readout', this.IsReadout ? 'true' : 'false');
        result.Keywords = Array.from(new Set(this.Keywords));

        return result;
    }
}


export class FilterEntity {
    public ConditionPairs: Map<string, string>;
    public Keywords: Array<string>;

    constructor() {
        this.ConditionPairs = new Map();
        this.Keywords = [];
    }
}
