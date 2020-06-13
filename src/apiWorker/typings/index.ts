/* tslint:disable */
export interface LoginResPayload {
  access_token: string;
}
export interface LoginResDto {
  payload: LoginResPayload;
}
export type AuthControllerLoginResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? LoginResDto
    : any
  : any;
export interface LoginDto {
  password: string;
  phone: string;
}
export type AuthControllerLoginRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? LoginDto : any;
export interface FlatPhoneDto {
  id: number;
  phone: string;
}
export type AuthControllerGetProfileResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FlatPhoneDto
    : any
  : any;
export interface CreatePhoneResDto {
  payload: FlatPhoneDto;
}
export type AuthControllerCreateUserResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreatePhoneResDto
    : any
  : any;
export interface CreatePhoneDto {
  phone: string;
}
export type AuthControllerCreateUserRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreatePhoneDto : any;
export interface PasswordsOfPhoneNotFound {
  name: 'PasswordsOfPhoneNotFound';
  message: string;
  param: {
    phone?: string;
  };
}
export interface CreatePasswordResDto {
  PasswordsOfPhoneNotFound?: PasswordsOfPhoneNotFound;
  payload?: FlatPhoneDto;
}
export type AuthControllerAddPasswordResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreatePasswordResDto
    : any
  : any;
export interface FlatCheckoutDto {
  id: number;
  fn: string;
  address: string;
}
export interface FlatQrDto {
  id: string;
  phone: FlatPhoneDto;
  checkout: FlatCheckoutDto;
  fp: string;
  fd: string;
  s: number;
  time: string;
}
export interface CheckoutNotFoundByFn {
  name: 'CheckoutNotFoundByFn';
  message: string;
  param: {
    fn?: string;
  };
}
export interface NotDrawNow {
  name: 'NotDrawNow';
  message: string;
  param: {
    now?: string;
  };
}
export interface QrAlreadyExists {
  name: 'QrAlreadyExists';
  message: string;
  param: {
    fd?: string;
    fp?: string;
  };
}
export interface QrSalaryNotEnough {
  name: 'QrSalaryNotEnough';
  message: string;
  param: {
    s?: number;
    sLimit?: number;
  };
}
export interface QrRegistrationLimitExceeded {
  name: 'QrRegistrationLimitExceeded';
  message: string;
  param: {
    nextTime?: string;
    phone?: string;
    qrLimit?: number;
  };
}
export interface CreateQrResDto {
  payload?: FlatQrDto;
  CheckoutNotFoundByFn?: CheckoutNotFoundByFn;
  NotDrawNow?: NotDrawNow;
  QrAlreadyExists?: QrAlreadyExists;
  QrSalaryNotEnough?: QrSalaryNotEnough;
  QrRegistrationLimitExceeded?: QrRegistrationLimitExceeded;
}
export type QrControllerAddQrResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateQrResDto
    : any
  : any;
export interface CreateQrDto {
  fn: string;
  fp: string;
  fd: string;
  s: number;
  qrString: string;
}
export type QrControllerAddQrRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateQrDto : any;
export interface GetQrNumResDto {
  payload: string;
}
export type QrControllerCountQrResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? GetQrNumResDto
    : any
  : any;
export interface FlatDrawDto {
  id: number;
  start: string;
  end: string;
  description: string;
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
}
export interface FindAllDrawResDto {
  payload?: Array<FlatDrawDto>;
}
export type DrawControllerFindAllResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindAllDrawResDto
    : any
  : any;
export interface DatesAreTaken {
  name: 'DatesAreTaken';
  message: string;
  param: {
    startTaken?: string;
    endTaken?: string;
    start?: string;
    end?: string;
  };
}
export interface EndEarlierThanStart {
  name: 'EndEarlierThanStart';
  message: string;
  param: {
    start?: string;
    end?: string;
  };
}
export interface DateNotValid {
  name: 'DateNotValid';
  message: string;
  param: {
    dateString?: string;
  };
}
export interface CreateDrawResDto {
  payload?: FlatDrawDto;
  DatesAreTaken?: DatesAreTaken;
  EndEarlierThanStart?: EndEarlierThanStart;
  DateNotValid?: DateNotValid;
}
export type DrawControllerCreateDrawResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateDrawResDto
    : any
  : any;
export interface CreateDrawDto {
  start: string;
  end: string;
  description: string;
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
}
export type DrawControllerCreateDrawRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateDrawDto : any;
export interface FindNowDrawResDto {
  payload?: FlatDrawDto;
  NotDrawNow?: NotDrawNow;
}
export type DrawControllerFindNowResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindNowDrawResDto
    : any
  : any;
/**
 * Model of parameters for API `/draw/{id}`
 */
export interface DrawControllerDeleteDrawParameters {
  id: number;
}
export interface DrawNotFoundById {
  name: 'DrawNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface DeleteDrawResDto {
  payload: {
    id?: number;
  };
  DrawNotFoundById?: DrawNotFoundById;
}
export type DrawControllerDeleteDrawResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteDrawResDto
    : any
  : any;
/**
 * Model of parameters for API `/draw/{id}`
 */
export interface DrawControllerFindDrawWithQrsParameters {
  id: number;
}
export interface FullDrawDto {
  id: number;
  start: string;
  end: string;
  description: string;
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
  drawQrs: Array<FlatQrDto>;
}
export interface FindFullDrawResDto {
  payload?: FullDrawDto;
  DrawNotFoundById?: DrawNotFoundById;
}
export type DrawControllerFindDrawWithQrsResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindFullDrawResDto
    : any
  : any;
/**
 * Model of parameters for API `/draw/{id}`
 */
export interface DrawControllerChangeDrawSalaryParameters {
  id: number;
}
export interface ChangeDrawResDto {
  payload?: FlatDrawDto;
  DrawNotFoundById?: DrawNotFoundById;
}
export type DrawControllerChangeDrawSalaryResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? ChangeDrawResDto
    : any
  : any;
export interface ChangeDrawDto {
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
}
export type DrawControllerChangeDrawSalaryRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? ChangeDrawDto : any;
export type DrawControllerCreateDrawNextResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateDrawResDto
    : any
  : any;
export interface CreateDrawNextDto {
  end: string;
  description: string;
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
}
export type DrawControllerCreateDrawNextRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateDrawNextDto : any;
/**
 * Model of parameters for API `/checkout/{fn}`
 */
export interface CheckoutControllerFindCheckoutParameters {
  fn: string;
}
export interface FindCheckoutResDto {
  CheckoutNotFoundByFn?: CheckoutNotFoundByFn;
  payload?: FlatCheckoutDto;
}
export type CheckoutControllerFindCheckoutResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindCheckoutResDto
    : any
  : any;
export interface FindAllCheckoutsResDto {
  payload?: Array<FlatCheckoutDto>;
}
export type CheckoutControllerFindAllCheckoutResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindAllCheckoutsResDto
    : any
  : any;
export interface CheckoutAlreadyExists {
  name: 'CheckoutAlreadyExists';
  message: string;
  param: {
    fn?: string;
  };
}
export interface CreateCheckoutResDto {
  payload?: FlatCheckoutDto;
  CheckoutAlreadyExists?: CheckoutAlreadyExists;
}
export type CheckoutControllerCreateCheckoutResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateCheckoutResDto
    : any
  : any;
export interface CreateCheckoutDto {
  fn: string;
  address: string;
}
export type CheckoutControllerCreateCheckoutRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateCheckoutDto : any;
/**
 * Model of parameters for API `/checkout/{checkoutId}`
 */
export interface CheckoutControllerDeleteCheckoutParameters {
  checkoutId: number;
}
export interface CheckoutNotFoundById {
  name: 'CheckoutNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface DeleteCheckoutResDto {
  payload: {
    checkoutId?: number;
  };
  CheckoutNotFoundById?: CheckoutNotFoundById;
}
export type CheckoutControllerDeleteCheckoutResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteCheckoutResDto
    : any
  : any;
/**
 * Model of parameters for API `/checkout/{checkoutId}/qrs`
 */
export interface CheckoutControllerGetQrsOfCheckoutParameters {
  checkoutId: number;
}
export interface FindQrsOfCheckoutResDto {
  payload?: Array<FlatQrDto>;
  CheckoutNotFoundByFn?: CheckoutNotFoundByFn;
}
export type CheckoutControllerGetQrsOfCheckoutResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindQrsOfCheckoutResDto
    : any
  : any;
export interface TextContentDto {
  id: number;
  value: string;
}
export interface TextFieldContentDto {
  id: number;
  name: string;
  description: string;
  value?: TextContentDto;
}
export interface ImgDto {
  id: number;
  path: string;
  url: string;
  host: string;
}
export interface ImgFieldContentDto {
  id: number;
  name: string;
  description: string;
  img?: ImgDto;
}
export interface MdDto {
  id: number;
  value: string;
}
export interface MdFieldContentDto {
  id: number;
  name: string;
  label: string;
  values: Array<MdDto>;
}
export interface ScreenContentDto {
  id: number;
  name: string;
  description: string;
  textFields: Array<TextFieldContentDto>;
  imgFields: Array<ImgFieldContentDto>;
  mdFields: Array<MdFieldContentDto>;
}
export interface GetContentResDto {
  payload: Array<ScreenContentDto>;
}
export type ContentControllerGetContentResponse<
  TCode extends 200 | 400 = 200 | 400,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? GetContentResDto
    : any
  : TCode extends 400
  ? TContentType extends 'application/json'
    ? /**
       * Empty response
       */
      null
    : any
  : any;
export interface FlatScreenDto {
  id: number;
  name: string;
  description: string;
}
export interface FindAllScreensResDto {
  payload: Array<FlatScreenDto>;
}
export type ScreenControllerFindAllScreensResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindAllScreensResDto
    : any
  : any;
export interface ScreenAlreadyExists {
  name: 'ScreenAlreadyExists';
  message: string;
  param: {
    name?: string;
  };
}
export interface CreateScreenResDto {
  payload?: FlatScreenDto;
  ScreenAlreadyExists?: ScreenAlreadyExists;
}
export type ScreenControllerCreateScreenResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateScreenResDto
    : any
  : any;
export interface CreateScreenDto {
  name: string;
  description: string;
}
export type ScreenControllerCreateScreenRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateScreenDto : any;
/**
 * Model of parameters for API `/screen/{screenId}`
 */
export interface ScreenControllerDeleteScreenByIdParameters {
  screenId: number;
}
export interface ScreenNotFoundById {
  name: 'ScreenNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface DeleteScreenResDto {
  payload: {
    id?: number;
  };
  ScreenNotFoundById?: ScreenNotFoundById;
}
export type ScreenControllerDeleteScreenByIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteScreenResDto
    : any
  : any;
/**
 * Model of parameters for API `/screen/{screenId}`
 */
export interface ScreenControllerFindScreenByIdParameters {
  screenId: number;
}
export interface TextDto {
  id: number;
  createDate: string;
  value: string;
}
export interface TextFieldDto {
  id: number;
  name: string;
  description: string;
  values: Array<TextDto>;
}
export interface ImgFieldDto {
  id: number;
  name: string;
  description: string;
  img: Array<ImgDto>;
}
export interface MdFieldDto {
  id: number;
  name: string;
  label: string;
  values: Array<MdDto>;
}
export interface ScreenDto {
  id: number;
  name: string;
  description: string;
  textFields: Array<TextFieldDto>;
  imgFields: Array<ImgFieldDto>;
  mdFields: Array<MdFieldDto>;
}
export interface FindScreenByIdResDto {
  payload?: ScreenDto;
  ScreenNotFoundById?: ScreenNotFoundById;
}
export type ScreenControllerFindScreenByIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindScreenByIdResDto
    : any
  : any;
/**
 * Model of parameters for API `/screen/{screenId}`
 */
export interface ScreenControllerChangeScreenNameParameters {
  screenId: number;
}
export interface ChangeScreenNameResDto {
  payload?: FlatScreenDto;
  ScreenNotFoundById?: ScreenNotFoundById;
}
export type ScreenControllerChangeScreenNameResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? ChangeScreenNameResDto
    : any
  : any;
export interface ChangeScreenNameDto {
  name: string;
}
export type ScreenControllerChangeScreenNameRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? ChangeScreenNameDto : any;
export interface FlatImgFieldDto {
  id: number;
  name: string;
  description: string;
}
export interface ImgFieldAlreadyExistsInScreen {
  name: 'ImgFieldAlreadyExistsInScreen';
  message: string;
  param: {
    name?: string;
    screenId?: number;
  };
}
export interface CreateImgFieldResDto {
  payload?: FlatImgFieldDto;
  ScreenNotFoundById?: ScreenNotFoundById;
  ImgFieldAlreadyExistsInScreen?: ImgFieldAlreadyExistsInScreen;
}
export type ImgControllerCreateImgFieldResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateImgFieldResDto
    : any
  : any;
export interface CreateImgFieldDto {
  screenId: number;
  name: string;
  description: string;
}
export type ImgControllerCreateImgFieldRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateImgFieldDto : any;
/**
 * Model of parameters for API `/img/field/{fieldId}`
 */
export interface ImgControllerDeleteImgFieldParameters {
  fieldId: number;
}
export interface ImgFieldNotFoundById {
  name: 'ImgFieldNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface DeleteImgFieldResDto {
  payload: {
    id?: number;
  };
  ImgFieldNotFoundById?: ImgFieldNotFoundById;
}
export type ImgControllerDeleteImgFieldResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteImgFieldResDto
    : any
  : any;
/**
 * Model of parameters for API `/img/field/{fieldId}`
 */
export interface ImgControllerFindFieldByIdParameters {
  fieldId: number;
}
export interface FindImgFieldByIdResDto {
  payload?: ImgFieldDto;
  ImgFieldNotFoundById?: ImgFieldNotFoundById;
}
export type ImgControllerFindFieldByIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindImgFieldByIdResDto
    : any
  : any;
/**
 * Model of parameters for API `/img/field/{fieldId}/value`
 */
export interface ImgControllerUploadFileParameters {
  fieldId: number;
  file: any;
}
export interface CreateImgResDto {
  payload?: ImgDto;
  ImgFieldNotFoundById?: ImgFieldNotFoundById;
}
export type ImgControllerUploadFileResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateImgResDto
    : any
  : any;
/**
 * Model of parameters for API `/img/field/{fieldId}/value/{imgId}/before`
 */
export interface ImgControllerGetImgBeforeParameters {
  fieldId: number;
  imgId: number;
}
export interface ImgVersionBeforeNotFound {
  name: 'ImgVersionBeforeNotFound';
  message: string;
  param: {
    fieldId?: number;
    imgId?: number;
  };
}
export interface ImgNotFoundByIdInField {
  name: 'ImgNotFoundByIdInField';
  message: string;
  param: {
    imgId?: number;
    fieldId?: number;
  };
}
export interface GetImgBeforeResDto {
  payload?: ImgDto;
  ImgVersionBeforeNotFound?: ImgVersionBeforeNotFound;
  ImgFieldNotFoundById?: ImgFieldNotFoundById;
  ImgNotFoundByIdInField?: ImgNotFoundByIdInField;
}
export type ImgControllerGetImgBeforeResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? GetImgBeforeResDto
    : any
  : any;
export interface ImgNotFoundById {
  name: 'ImgNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface SaveImgLastResDto {
  payload?: ImgDto;
  ImgNotFoundById?: ImgNotFoundById;
}
export type ImgControllerSaveImgBeforeResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? SaveImgLastResDto
    : any
  : any;
export interface SaveImgLastDto {
  imgId: number;
}
export type ImgControllerSaveImgBeforeRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? SaveImgLastDto : any;
/**
 * Model of parameters for API `/md/field/{fieldId}`
 */
export interface MdControllerDeleteMdFieldParameters {
  fieldId: number;
}
export interface MdFieldNotFoundById {
  name: 'MdFieldNotFoundById';
  message: string;
  param: {
    fieldId?: number;
  };
}
export interface DeleteMdFieldResDto {
  payload: {
    id?: number;
  };
  MdFieldNotFoundById?: MdFieldNotFoundById;
}
export type MdControllerDeleteMdFieldResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteMdFieldResDto
    : any
  : any;
/**
 * Model of parameters for API `/md/field/{fieldId}`
 */
export interface MdControllerFindMdFieldParameters {
  fieldId: number;
}
export type MdControllerFindMdFieldResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? {
        [key: string]: any;
      }
    : any
  : any;
export interface FlatMdFieldDto {
  id: number;
  name: string;
  label: string;
}
export interface MdFieldAlreadyExistInScreen {
  name: 'MdFieldAlreadyExistInScreen';
  message: string;
  param: {
    screenId?: number;
    name?: string;
  };
}
export interface CreateMdFieldResDto {
  payload?: FlatMdFieldDto;
  ScreenNotFoundById?: ScreenNotFoundById;
  MdFieldAlreadyExistInScreen?: MdFieldAlreadyExistInScreen;
}
export type MdControllerCreateMdFieldResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateMdFieldResDto
    : any
  : any;
export interface CreateMdFieldDto {
  name: string;
  label: string;
  screenId: number;
}
export type MdControllerCreateMdFieldRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateMdFieldDto : any;
export interface CreateMdResDto {
  payload?: MdDto;
  MdFieldNotFoundById?: MdFieldNotFoundById;
}
export type MdControllerCreateMdResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateMdResDto
    : any
  : any;
export interface CreateMdDto {
  fieldId: number;
  value: string;
}
export type MdControllerCreateMdRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateMdDto : any;
export interface FlatTextFieldDto {
  id: number;
  name: string;
  description: string;
}
export interface TextFieldAlreadyExists {
  name: 'TextFieldAlreadyExists';
  message: string;
  param: {
    name?: string;
    screenId?: number;
  };
}
export interface CreateTextFieldResDto {
  payload?: FlatTextFieldDto;
  ScreenNotFoundById?: ScreenNotFoundById;
  TextFieldAlreadyExists?: TextFieldAlreadyExists;
}
export type TextControllerCreateFieldResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateTextFieldResDto
    : any
  : any;
export interface CreateTextFieldDto {
  name: string;
  description: string;
  screenId: number;
}
export type TextControllerCreateFieldRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateTextFieldDto : any;
export interface TextFieldNotFoundById {
  name: 'TextFieldNotFoundById';
  message: string;
  param: {
    id?: number;
  };
}
export interface CreateTextResDto {
  payload?: TextDto;
  TextFiledNotFoundById?: TextFieldNotFoundById;
}
export type TextControllerCreateTextResponse<
  TCode extends 201 = 201,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 201
  ? TContentType extends 'application/json'
    ? CreateTextResDto
    : any
  : any;
export interface CreateTextDto {
  value: string;
  fieldId: number;
}
export type TextControllerCreateTextRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateTextDto : any;
/**
 * Model of parameters for API `/text/field/{fieldId}`
 */
export interface TextControllerDeleteTextFieldParameters {
  fieldId: number;
}
export interface DeleteTextFieldResDto {
  payload: {
    id?: number;
  };
  TextFieldNotFoundById?: TextFieldNotFoundById;
}
export type TextControllerDeleteTextFieldResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? DeleteTextFieldResDto
    : any
  : any;
/**
 * Model of parameters for API `/text/field/{fieldId}`
 */
export interface TextControllerFindTextOfFiledParameters {
  fieldId: number;
}
export interface FindTextOfFieldResDto {
  payload?: TextFieldDto;
  TextFiledNotFoundById?: TextFieldNotFoundById;
}
export type TextControllerFindTextOfFiledResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    ? FindTextOfFieldResDto
    : any
  : any;
