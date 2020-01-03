export class FilterCondition {
    public ID: string;
    public ImpactedProduct: string;
    public FixVersion: string;
    public Component: string;
    public Submitter: string;
    public RootCauseCR: string;
    public IsReadout: string;
    public Keywords: Array<string>;

    public GetFilterEntity() {
        let result = new FilterEntity();
        if (this.ID) {
            result.FilterItems.push({
                key: 'ID',
                value: this.ID,
                Type: 'only'
            });
        }

        if (this.ImpactedProduct) {
            result.FilterItems.push({
                key: 'Impacted Product',
                value: this.ImpactedProduct,
                Type: 'and'
            });
        }

        if (this.FixVersion) {
            result.FilterItems.push({
                key: 'Fix Version',
                value: this.FixVersion,
                Type: 'and'
            });
        }

        if (this.Component) {
            result.FilterItems.push({
                key: 'Component',
                value: this.Component,
                Type: 'and'
            });
        }

        if (this.Submitter) {
            result.FilterItems.push({
                key: 'Submitter',
                value: this.Submitter,
                Type: 'and'
            });
        }

        if (this.RootCauseCR) {
            result.FilterItems.push({
                key: 'Root Cause CR',
                value: this.RootCauseCR,
                Type: 'and'
            });
        }

        if (this.IsReadout) {
            result.FilterItems.push({
                key: 'Is Readout',
                value: this.IsReadout,
                Type: 'and'
            });
        }

        result.Keywords = Array.from(new Set(this.Keywords));

        return result;
    }
}


export class FilterEntity {
    public FilterItems: Array<FilterItem>;
    public Keywords: Array<string>;

    constructor() {
        this.FilterItems = [];
        this.Keywords = [];
    }
}

export class FilterItem {
    public key: string;
    public value: string;
    public Type: string;
}
