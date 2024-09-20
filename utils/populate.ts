import prisma from "./prisma";

export async function populateDB() {
  if ((await prisma.category.count()) < 1) {
    const todoCategory = await prisma.category.create({
      data: {
        name: "Todo",
        color: "#BBBBBB",
        position: 0,
      },
    });
    await prisma.task.create({
      data: {
        name: "Task 1",
        description: "This is a sample task",
        categoryId: todoCategory.id,
        position: 0,
      },
    });
    await prisma.category.create({
      data: {
        name: "In progress",
        color: "#FFBF00",
        position: 1,
      },
    });
    await prisma.category.create({
      data: {
        name: "Completed",
        color: "#228B22",
        position: 2,
      },
    });
  }
}
