export class FilterCondition {
    public RCAID: string;
    public ImpactedProduct: string;
    public ImpactedProductID: string;
    public FixVersion: string;
    public FixVersionID: string;
    public Component: string;
    public ComponentID: string;
    public Submitter: string;
    public RootCauseCR: string;
    public ReadoutLevel: string;
    public ReadoutLevelID: string;
    public Keywords: string[] = [];
    public QuickSearch: string; //TODO

    public GetFilterEntity() {
        let result = new FilterEntity();
        if (this.RCAID) {
            result.FilterItems.push({
                key: 'RCAID',
                values: [this.RCAID],
                Type: 'only'
            });
        }

        if (this.ImpactedProduct) {
            result.FilterItems.push({
                key: 'Impacted Product',
                values: [this.ImpactedProduct],
                Type: 'and'
            });
        }

        if (this.FixVersion) {
            result.FilterItems.push({
                key: 'Fix Version',
                values: [this.FixVersion],
                Type: 'and'
            });
        }

        if (this.Component) {
            result.FilterItems.push({
                key: 'Component',
                values: [this.Component],
                Type: 'and'
            });
        }

        if (this.Submitter) {
            result.FilterItems.push({
                key: 'Submitter',
                values: [this.Submitter],
                Type: 'and'
            });
        }

        if (this.RootCauseCR) {
            result.FilterItems.push({
                key: 'Root Cause CR',
                values: [this.RootCauseCR],
                Type: 'and'
            });
        }

        if (this.ReadoutLevel) {
            result.FilterItems.push({
                key: 'Readout Level',
                values: [this.ReadoutLevel],
                Type: 'and'
            });
        }

        if (this.Keywords) {
            result.FilterItems.push({
                key: 'Keywords',
                values: Array.from(new Set(this.Keywords)),
                Type: 'and'
            });
        }

        return result;
    }

    public isEmpty(): boolean{
        return !this.RCAID &&
        !this.ImpactedProduct &&
        !this.ImpactedProductID &&
        !this.FixVersion &&
        !this.FixVersionID &&
        !this.Component &&
        !this.ComponentID &&
        !this.Submitter &&
        !this.RootCauseCR &&
        this.ReadoutLevel &&
        this.ReadoutLevelID &&
        this.Keywords.length == 0;
    }
}


export class FilterEntity {
    public FilterItems: Array<FilterItem>;
    public QuickSearch: string; //TODO

    constructor() {
        this.FilterItems = [];
    }
}

export class FilterItem {
    public key: string;
    public values: string[];
    public Type: string;
}
