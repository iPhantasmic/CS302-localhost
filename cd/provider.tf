variable "ACCESS_ID" {
  type = string
}

variable "SECRET_KEY" {
  type = string
}

provider "aws" {
  region     = "ap-southeast-1"
  access_key = var.ACCESS_ID
  secret_key = var.SECRET_KEY
}