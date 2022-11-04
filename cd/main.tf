variable "PORT" {
  type = string
}

variable "AUTH_SVC_URL" {
  type = string
}

resource "aws_ecs_task_definition" "api-gateway" {
  family = "api-gateway"
  execution_role_arn       = "arn:aws:iam::631945473733:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name = "api-gateway"
      image = "631945473733.dkr.ecr.ap-southeast-1.amazonaws.com/bookings:latest"
      cpu = 512
      memory = 512
      essential = true
      portMappings = [{
        containerPort = 6969
        hostPort = 6969
      }]
      environment = [
        { name = "PORT", value = var.PORT },
        { name = "AUTH_SVC_URL", value = var.AUTH_SVC_URL }
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