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

variable "JWT_SECRET_KEY" {
  type = string
}

resource "aws_ecs_task_definition" "auth-service" {
  family = "auth-service"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "auth-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/authentication:${var.IMAGE_VERSION}"
      cpu = 1536
      memory = 1536
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
        { name = "DB_SCHEMA", value = var.DB_SCHEMA },
        { name = "JWT_SECRET_KEY", value = var.JWT_SECRET_KEY }
      ]
      logConfiguration = {
        "logDriver" = "awslogs",
        options = {
          "awslogs-create-group": "true",
          "awslogs-group": "awslogs-authuser",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "awslogs-authuser"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "auth-service" {
  name = "auth-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302-auth"
  task_definition = aws_ecs_task_definition.auth-service.arn
  desired_count = 1
}