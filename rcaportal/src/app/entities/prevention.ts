export class PreventionItem {
  ID: string = '';
  MainTypeID: string = '';
  SubTypeID: string = '';
  Details: string = '';
  StatusID: string = '';
}

export class MainTypeInfo {
  ID: string;
  Name: string;
}

export class SubTypeInfo {
  ID: string;
  Name: string;
  MainTypeID: string;
}

export class PreventionType {
  ID: string;
  Name: string;
}

export class PreventionStatus {
  ID: string;
  Name: string;
}
