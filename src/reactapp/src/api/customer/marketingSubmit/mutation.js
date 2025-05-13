export const MARKETING_SUBMIT_MUTATION = `
 mutation CarelineMarketing($masked_quote_id: String!, $email_opt_in: Int, $post_opt_in: Int) {
  carelineMarketing(masked_quote_id: $masked_quote_id, email_opt_in: $email_opt_in, post_opt_in: $post_opt_in){
    quote_id,
    email_opt_in,
    post_opt_in,
  }
}`;
