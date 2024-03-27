export interface PaymentModel {
  date?: Date;
  total_price?: Number;
  down_payment?: Number;
  payment_type?: String;
  bank_name?: String;
  account_number?: String;
  nominal?: Number;
  remaining_payment?: Number;
  foto: String;
  description?: String;
}
