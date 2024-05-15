# Biruni Explanation

Biruni is a flexible and versatile data manipulation interface that abstracts the interacting with different data management solutions. It offers developers a unified API for handling read, write and update across multiple data storage technologies. The unique selling point of Biruni is its ability to work with a wide range of data management solutions, including ORMs, ODMs, Bucket Stores, Database Drivers, and others, without being bound to a specific implementation.

Biruni is not a Storage Interface in the traditional sense, but rather an abstract and versatile data manipulation interface. It neither functions as an Object-Relational Mapper (ORM), Object Document Mapper (ODM), Bucket Store, Database Driver, nor a simple storage persister. Instead, it offers a flexible and unified API for interacting with multiple data management solutions without being bound to a particular implementation.

Think of Biruni as a Swiss army knife for data manipulation, providing various tools to read, write and update using different underlying storage technologies. This feature gives developers the ability to switch between various data management solutions with minimal effort, making Biruni well-suited for projects that require data flexibility, agility, and scalability.

<picture id="explain-picture">
  <img src="/assets/diagram/biruni-full.png" id="explain-image" />
  <p id="explain-description">An In-depth Look into Biruni: A Flexible Data Manipulation Interface</p>
</picture>

<style>
  #explain-picture {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
    height: auto;
    border-radius: 1rem;
    overflow: hidden;
  }

  #explain-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  #explain-description {
    position: absolute;
    bottom: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0 1rem 1rem 0;
    background: hsla(0, 0%, 0%, 70%);
  }
</style>

## What Is Do

-   Unified API: Biruni provides a simple, consistent and unified API for handling data operations across different storage technologies.
-   Pluggable Architecture: Developers can easily extend Biruni with custom adapters for new data management solutions or features.
-   Flexibility: Biruni allows developers to choose the best data management solution based on their requirements, without being locked in.
-   Agility and Scalability: Biruni makes it easier to switch between different data management solutions to accommodate changes required by the projects or enhance the performance.
