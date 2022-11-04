terraform {
  backend "http" {
    address = "https://gitlab.com/api/v4/projects/40363909/terraform/state/terraform_state"
    lock_address = "https://gitlab.com/api/v4/projects/40363909/terraform/state/terraform_state/lock"
    lock_method = "POST"
    unlock_address = "https://gitlab.com/api/v4/projects/40363909/terraform/state/terraform_state/lock"
    unlock_method = "DELETE"
  }
}