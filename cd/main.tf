variable "IMAGE_VERSION" {
  type = string
}

variable "PORT" {
  type = string
}

variable "AUTH_SVC_URL" {
  type = string
}

variable "BOOKINGS_SVC_URL" {
  type = string
}

variable "LISTINGS_SVC_URL" {
  type = string
}

variable "REVIEWS_SVC_URL" {
  type = string
}

variable "PAYMENTS_SVC_URL" {
  type = string
}

variable "SNS_ACCESS_KEY_ID" {
  type = string
}

variable "SNS_SECRET_ACCESS_KEY" {
  type = string
}

resource "aws_ecs_task_definition" "api-gateway" {
  family = "api-gateway"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "api-gateway"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/api-gateway:${var.IMAGE_VERSION}"
      cpu = 1536
      memory = 1536
      essential = true
      portMappings = [{
        containerPort = 6969
        hostPort = 6969
      }]
      environment = [
        { name = "PORT", value = var.PORT },
        { name = "AUTH_SVC_URL", value = var.AUTH_SVC_URL },
        { name = "BOOKINGS_SVC_URL", value = var.BOOKINGS_SVC_URL },
        { name = "LISTINGS_SVC_URL", value = var.LISTINGS_SVC_URL },
        { name = "REVIEWS_SVC_URL", value = var.REVIEWS_SVC_URL },
        { name = "PAYMENTS_SVC_URL", value = var.PAYMENTS_SVC_URL },
        { name = "SNS_ACCESS_KEY_ID", value = var.SNS_ACCESS_KEY_ID },
        { name = "SNS_SECRET_ACCESS_KEY", value = var.SNS_SECRET_ACCESS_KEY }
      ]
      logConfiguration = {
        "logDriver" = "awslogs",
        options = {
          "awslogs-create-group": "true",
          "awslogs-group": "awslogs-api-gateway",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "awslogs-api-gateway"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "api-gateway" {
  name = "api-gateway"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302"
  task_definition = aws_ecs_task_definition.api-gateway.arn
  desired_count = 1
}
