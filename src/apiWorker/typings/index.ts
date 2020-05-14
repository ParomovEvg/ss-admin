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
export interface PhoneAlreadyExists {
  name: 'PhoneAlreadyExists';
  message: string;
  param: {
    phone?: string;
  };
}
export interface CreatePhoneResDto {
  payload?: FlatPhoneDto;
  PhoneAlreadyExists?: PhoneAlreadyExists;
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
  password: string;
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
export interface CreatePasswordDto {
  password: string;
}
export type AuthControllerAddPasswordRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreatePasswordDto : any;
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
  value: TextContentDto;
}
export interface ScreenContentDto {
  id: number;
  name: string;
  textFields: Array<TextFieldContentDto>;
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
export interface FlatTextFieldDto {
  id: number;
  name: string;
}
export interface ScreenNotFoundById {
  name: 'ScreenNotFoundById';
  message: string;
  param: {
    id?: number;
  };
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
  screenId: number;
}
export type TextControllerCreateFieldRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateTextFieldDto : any;
export interface TextDto {
  id: number;
  createDate: string;
  value: string;
}
export interface CreateTextResDto {
  payload?: TextDto;
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
export interface TextFieldNotFoundById {
  name: 'TextFieldNotFoundById';
  message: string;
  param: {
    id?: number;
  };
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
export interface TextFieldDto {
  id: number;
  name: string;
  values: Array<TextDto>;
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
export interface FlatScreenDto {
  id: number;
  name: string;
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
}
export type ScreenControllerCreateScreenRequest<
  TCode extends 'application/json' = 'application/json'
> = TCode extends 'application/json' ? CreateScreenDto : any;
/**
 * Model of parameters for API `/screen/{screenId}`
 */
export interface ScreenControllerFindScreenByIdParameters {
  screenId: number;
}
export interface ScreenDto {
  id: number;
  name: string;
  textFields: Array<TextFieldDto>;
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
