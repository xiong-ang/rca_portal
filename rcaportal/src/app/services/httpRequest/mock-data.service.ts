import { Injectable } from '@angular/core';
import { FilterCondition } from '@app/entities/filterCondition';
import { RCAItem } from '@app/entities/rcaItem';
import { HotKeyword } from '@app/entities/hotKeyword';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  public Products: Array<any>;
  public ReadOutLevels: Array<string>;
  public HotKeywords: Array<HotKeyword>;
  public HotRCAs: Array<RCAItem>;
  public RCAItems: Array<RCAItem>;

  constructor() {
    this.Products = [
      {
        name: 'FTView SE',
        versions: ['v1.0SE', 'v2.0SE', 'v3.0SE', 'v4.0SE', 'v5.0SE', 'v6.0SE', 'v7.0SE', '8.0SE'],
        components: ['SE-Component-1', 'SE-Component-2', 'SE-Component-3', 'SE-Component-4', 'SE-Component-5'],
      },
      {
        name: 'FTView ME',
        versions: ['v1.0ME', 'v2.0ME', 'v3.0ME', 'v4.0ME', 'v5.0ME', 'v6.0ME', 'v7.0ME', '8.0ME'],
        components: ['ME-Component-1', 'ME-Component-2', 'ME-Component-3', 'ME-Component-4', 'ME-Component-5'],
      },
      {
        name: 'CCW',
        versions: ['v1.0CCW', 'v2.0CCW', 'v3.0CCW', 'v4.0CCW', 'v5.0CCW', 'v6.0CCW', 'v7.0CCW', '8.0CCW'],
        components: ['CCW-Component-1', 'CCW-Component-2', 'CCW-Component-3', 'CCW-Component-4', 'CCW-Component-5'],
      }
    ];

    this.ReadOutLevels = ['NA', 'News Letter', 'PI Plan', 'Sprint Review', 'Team Meeting'];
    this.HotKeywords = [];
    this.HotRCAs = [];
    this.RCAItems = [];
    for (let index = 0; index < 100; index++) {
      this.HotKeywords.push(
        {
          ID: `keyworkd-${index}`,
          KeywordValue: `KEYWORD-${index}`,
          HotValue: 100 * (100 - index),
          HotProp: 100 - index,
          RCACount: 999 - 9 * index
        });


      let randomProduct = this.Products[index % 3];
      let randomVersion = randomProduct.versions[index % 8];
      let randomComponent = randomProduct.components[index % 5];
      this.RCAItems.push({
        ID: `ID-${index}`,
        RCAID: `RCA-${index}`,
        Header: `[RCA-${index}]Because MatDialog instantiates components at run-time, Because MatDialog instantiates components at run-time, Because MatDialog instantiates components at run-time, Because MatDialog instantiates components at run-time`,
        Submitter: index % 5 == 0 ? 'Admin' : `People-${index}`,
        KeyWords: [`KEYWORD-${index}`, `KEYWORD-${99 - index}`],
        RootCauseCR: `RCA-${index}`,
        ImpactedProduct: randomProduct.name,
        ImpactedProductID:"",
        FixVersion: randomVersion,
        FixVersionID:"",
        Component: randomComponent,
        ComponentID:"",
        ReadoutLevel: this.ReadOutLevels[index % 5],
        ReadoutLevelID:"",
        RootCauseAnalyze: 'The root cause is ....The root cause is ....The root cause is ....The root cause is ....The root cause is ....The root cause is ....The root cause is ....The root cause is ....',
        RequirementCorrectAndPrevention: {
          RootCause: 'The root cause summary per this view with more details',
          Correction: 'Here is how to correct this incorrect behavior, work progress, technology',
          Prevention: 'Here is how to prevent this kind of incorrect behavior, work progress, technology'
        },
        DevCorrectAndPrevention: {
          RootCause: 'The root cause summary per this view with more details',
          Correction: 'Here is how to correct this incorrect behavior, work progress, technology',
          Prevention: 'Here is how to prevent this kind of incorrect behavior, work progress, technology'
        },
        TestCorrectAndPrevention: {
          RootCause: 'The root cause summary per this view with more details',
          Correction: 'Here is how to correct this incorrect behavior, work progress, technology',
          Prevention: 'Here is how to prevent this kind of incorrect behavior, work progress, technology'
        },
        Attachments: [
          {
            ID: `Attachment-${index}-1`,
            Type: 'image',
            Name: `Attachment-${index}-1.png`
          },
          {
            ID: `Attachment-${index}-2`,
            Type: 'text',
            Name: `Attachment-${index}-2.xml`
          },
          {
            ID: `Attachment-${index}-3`,
            Type: 'binary',
            Name: `Attachment-${index}-2.dll`
          }
        ],
        IsManagable: index % 2 == 0 ? true : false
      });
    }

    this.HotRCAs = this.RCAItems;
  }

  GetFilteredRCAs(filterCondition: FilterCondition): Array<RCAItem> {
    return this.RCAItems.filter(rca => {
      let filterResult = true;
      if (filterCondition.RCAID) return (filterCondition.RCAID == rca.RCAID);

      if (filterCondition.ImpactedProduct) filterResult = filterResult && (filterCondition.ImpactedProduct == rca.ImpactedProduct);
      if (filterCondition.FixVersion ) filterResult = filterResult && (filterCondition.FixVersion == rca.FixVersion);
      if (filterCondition.Component ) filterResult = filterResult && (filterCondition.Component == rca.Component);
      if (filterCondition.Submitter) filterResult = filterResult && (filterCondition.Submitter == rca.Submitter);
      if (filterCondition.RootCauseCR) filterResult = filterResult && (filterCondition.RootCauseCR == rca.RootCauseCR);
      if (filterCondition.ReadoutLevel) filterResult = filterResult && (filterCondition.ReadoutLevel == rca.ReadoutLevel);

      if (filterCondition.Keywords && filterCondition.Keywords.length > 0) {
        filterResult = filterResult && this.ArrayIncludes(rca.KeyWords, filterCondition.Keywords);
      }

      return filterResult;
    });
  }

  private ArrayIncludes(arr1, arr2): boolean {
    let uniqueArr1 = Array.from(new Set(arr1));
    let uniqueArr2 = Array.from(new Set(arr2));

    return uniqueArr2.every(val => uniqueArr1.includes(val));
  }
}
