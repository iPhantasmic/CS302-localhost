variable "IMAGE_VERSION" {
  type = string
}

variable "PORT" {
  type = string
}

variable "DB_USER" {
  type = string
}

variable "DB_PASSWORD" {
  type = string
}

variable "DB_HOST" {
  type = string
}

variable "DB_SCHEMA" {
  type = string
}

variable "STRIPE_API_KEY" {
  type = string
}

resource "aws_ecs_task_definition" "payments-service" {
  family = "payments-service"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "payments-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/payments:${var.IMAGE_VERSION}"
      cpu = 1536
      memory = 1536
      essential = true
      portMappings = [{
        containerPort = 4000
        hostPort = 420
      }]
      environment = [
        { name = "PORT", value = var.PORT },
        { name = "TYPEORM_USERNAME", value = var.DB_USER },
        { name = "TYPEORM_PASSWORD", value = var.DB_PASSWORD },
        { name = "TYPEORM_HOST", value = var.DB_HOST },
        { name = "TYPEORM_DATABASE", value = var.DB_SCHEMA },
        { name = "STRIPE_API_KEY", value = var.STRIPE_API_KEY }
      ]
      logConfiguration = {
        "logDriver" = "awslogs",
        options = {
          "awslogs-create-group": "true",
          "awslogs-group": "awslogs-payments",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "awslogs-payments"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "payments-service" {
  name = "payments-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302-payments"
  task_definition = aws_ecs_task_definition.payments-service.arn
  desired_count = 1
}