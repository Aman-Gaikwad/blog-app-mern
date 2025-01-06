import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-5">
  <div className="flex-1 flex flex-col items-start">
    <h2 className="text-2xl font-bold text-gray-800">
      Find Great Free Resources to Learn Coding!
    </h2>
    <p className="text-gray-600 mt-3">
      Explore a variety of free resources to enhance your coding knowledge, build projects, and develop in-demand skills.
    </p>
    <Button
      gradientDuoTone="purpleToPink"
      className="mt-4 rounded-lg px-4 py-2"
    >
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        Discover Free Coding Resources
      </a>
    </Button>
  </div>
  <div className="flex-1">
    <img
      src="https://i0.wp.com/googlebiz.net/wp-content/uploads/2024/08/Free-Courses-GoogleBiz-Institute.png?fit=1790%2C895&ssl=1"
      alt="Free Coding Resources"
      className="rounded-lg shadow-lg"
    />
  </div>
</div>
    </div>
  )
}