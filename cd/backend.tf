terraform {
  backend "http" {
    address = "https://gitlab.com/api/v4/projects/40084278/terraform/state/terraform.tfstate"
    lock_address = "https://gitlab.com/api/v4/projects/40084278/terraform/state/terraform.tfstate/lock"
    lock_method = "POST"
    unlock_address = "https://gitlab.com/api/v4/projects/40084278/terraform/state/terraform.tfstate/lock"
    unlock_method = "DELETE"
  }
}