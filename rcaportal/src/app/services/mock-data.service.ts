import { Injectable } from '@angular/core';
import { FilterCondition } from '@app/entities/filterCondition';
import { RCAItem } from '@app/entities/rcaItem';
import { hotRCA } from '@app/entities/hotRCA';
import { HotKeyword } from '@app/entities/hotKeyword';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  public Products = [];
  public HotKeywords: Array<HotKeyword>;
  public HotRCAs: Array<hotRCA>;
  public RCAItems: Array<RCAItem>;

  constructor() {
    this.Products = [
      {
        name: 'FactoryTalk View SE',
        displayName: 'FTView SE',
        versions: ['v1.0SE', 'v2.0SE', 'v3.0SE', 'v4.0SE', 'v5.0SE', 'v6.0SE', 'v7.0SE', '8.0SE'],
        components: ['SE-Component-1', 'SE-Component-2', 'SE-Component-3', 'SE-Component-4', 'SE-Component-5'],
      },
      {
        name: 'FactoryTalk View ME',
        displayName: 'FTView ME',
        versions: ['v1.0ME', 'v2.0ME', 'v3.0ME', 'v4.0ME', 'v5.0ME', 'v6.0ME', 'v7.0ME', '8.0ME'],
        components: ['ME-Component-1', 'ME-Component-2', 'ME-Component-3', 'ME-Component-4', 'ME-Component-5'],
      },
      {
        name: 'Connected Component Workbranch',
        displayName: 'CCW',
        versions: ['v1.0CCW', 'v2.0CCW', 'v3.0CCW', 'v4.0CCW', 'v5.0CCW', 'v6.0CCW', 'v7.0CCW', '8.0CCW'],
        components: ['CCW-Component-1', 'CCW-Component-2', 'CCW-Component-3', 'CCW-Component-4', 'CCW-Component-5'],
      }
    ];


    for (let index = 0; index < 100; index++) {
      this.HotKeywords.push(
        {
          ID: `keyworkd-${index}`,
          KeywordValue: `KEYWORD-${index}`,
          HotValue: 100 * (100 - index),
          HotProp: 100 - index,
          RCACount: 999 - 9 * index
        });



      this.HotRCAs.push({
        RankValue: `${index < 10 ? '0' : ''}${index}`,
        RCAID: `RCA-${index}`,
        RCAHeader: '[xxxxx]Because MatDialog instantiates components at run-time, Because MatDialog instantiates components at run-time'
      });


      let randomProduct = this.Products[index % 3];
      let randomVersion = randomProduct.versions[index % 8];
      let randomComponent = randomProduct.components[index % 5];
      this.RCAItems.push({
        ID: `RCA-${index}`,
        Header: '[xxxxx]Because MatDialog instantiates components at run-time, Because MatDialog instantiates components at run-time',
        Submitter: `People-${index}`,
        KeyWords: [`KEYWORD-${index}`, `KEYWORD-${99 - index}`],
        RootCauseCR: `RCA-${index}`,
        ImpactedProduct: randomProduct.name,
        FixVersion: randomVersion,
        Component: randomComponent,
        IsReadout: (index / 3 == 0) ? true : false,
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
        }
      });
    }
  }

  GetFilteredRCAs(filterCondition: FilterCondition) {
    // Implement Filter Logic
    this.RCAItems.filter(rca => {
      let filterResult = true;
      if (filterCondition.ID) filterResult = filterResult && (filterCondition.ID == rca.ID);
      if (filterCondition.FixVersion) filterResult = filterResult && (filterCondition.FixVersion == rca.FixVersion);
      if (filterCondition.Component) filterResult = filterResult && (filterCondition.Component == rca.Component);
      if (filterCondition.Submitter) filterResult = filterResult && (filterCondition.Submitter == rca.Submitter);
      if (filterCondition.RootCauseCR) filterResult = filterResult && (filterCondition.RootCauseCR == rca.RootCauseCR);
      if (filterCondition.IsReadout !== null) filterResult = filterResult && (filterCondition.IsReadout == rca.IsReadout);

      if (filterCondition.Keywords && filterCondition.Keywords.length > 0) {
        filterResult = filterResult && this.ArrayIncludes(rca.KeyWords, filterCondition.Keywords);
      }

      return filterResult;
    })
  }

  ArrayIncludes(arr1, arr2) {
    arr1 = Array.from(new Set(arr1));
    arr2 = Array.from(new Set(arr2));

    return arr2.every(val => arr1.includes(val));
  }
}
