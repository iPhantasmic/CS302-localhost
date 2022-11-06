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

variable "DB_PORT" {
  type = string
}

variable "DB_SCHEMA" {
  type = string
}

resource "aws_ecs_task_definition" "reviews-service" {
  family = "reviews-service"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "reviews-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/reviews:${var.IMAGE_VERSION}"
      cpu = 512
      memory = 512
      essential = true
      portMappings = [{
        containerPort = 50051
        hostPort = 50051
      }]
      environment = [
        { name = "PORT", value = var.PORT },
        { name = "DB_USER", value = var.DB_USER },
        { name = "DB_PASSWORD", value = var.DB_PASSWORD },
        { name = "DB_HOST", value = var.DB_HOST },
        { name = "DB_PORT", value = var.DB_PORT },
        { name = "DB_SCHEMA", value = var.DB_SCHEMA }
      ]
      logConfiguration = {
        "logDriver" = "awslogs",
        options = {
          "awslogs-create-group": "true",
          "awslogs-group": "awslogs-reviews",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "awslogs-reviews"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "reviews-service" {
  name = "reviews-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302"
  task_definition = aws_ecs_task_definition.reviews-service.arn
  desired_count = 1
}