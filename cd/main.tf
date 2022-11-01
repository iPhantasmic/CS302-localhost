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
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory = "1024"
  cpu = "512"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "auth-service"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/authentication:latest"
      cpu = 512
      memory = 1024
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
    }
  ])
}

resource "aws_ecs_service" "auth-service" {
  name = "auth-service"
  cluster = "arn:aws:ecs:ap-southeast-1:631945473733:cluster/cs302"
  task_definition = aws_ecs_task_definition.auth-service.arn
  launch_type = "FARGATE"
  network_configuration {
    subnets = ["subnet-09d7fd774d9d85fc9"]
    assign_public_ip = true
  }
  desired_count = 1
}