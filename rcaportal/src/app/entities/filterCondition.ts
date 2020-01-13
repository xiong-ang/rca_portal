export class FilterCondition {
    public ID: string;
    public ImpactedProduct: string;
    public FixVersions: string[] = [];
    public Components: string[] = [];
    public Submitter: string;
    public RootCauseCR: string;
    public ReadoutLevel: string;
    public Keywords: string[] = [];
    public QuickSearch: string; //TODO

    public GetFilterEntity() {
        let result = new FilterEntity();
        if (this.ID) {
            result.FilterItems.push({
                key: 'ID',
                values: [this.ID],
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

        if (this.FixVersions) {
            result.FilterItems.push({
                key: 'Fix Version',
                values: Array.from(new Set(this.FixVersions)),
                Type: 'and'
            });
        }

        if (this.Components) {
            result.FilterItems.push({
                key: 'Component',
                values: Array.from(new Set(this.Components)),
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
        return !this.ID &&
        !this.ImpactedProduct &&
        this.FixVersions.length == 0 &&
        this.Components.length == 0 &&
        !this.Submitter &&
        !this.RootCauseCR &&
        !this.ReadoutLevel &&
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
