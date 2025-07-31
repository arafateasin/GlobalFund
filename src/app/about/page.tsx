import { Header } from "@/components/Header";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About GlobalFund
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering global change through decentralized crowdfunding. We
            connect passionate people with impactful causes worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                GlobalFund is revolutionizing the way people contribute to
                meaningful causes. By leveraging blockchain technology, we
                ensure transparency, security, and global accessibility for
                crowdfunding campaigns.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform enables anyone, anywhere to create and support
                campaigns that make a real difference in the world, from
                emergency relief to education, healthcare, and environmental
                conservation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center text-6xl text-white">
                🌍
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              🔒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Secure & Transparent
            </h3>
            <p className="text-gray-600">
              Smart contracts ensure funds are secure and all transactions are
              transparent on the blockchain.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              🌐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600">
              Connect with causes and contributors from around the world without
              geographical barriers.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Fast & Efficient
            </h3>
            <p className="text-gray-600">
              Low fees and instant transfers powered by Ethereum blockchain
              technology.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              🎯
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Impact Tracking
            </h3>
            <p className="text-gray-600">
              Real-time updates and progress tracking to see the direct impact
              of your contributions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              🤝
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Community Driven
            </h3>
            <p className="text-gray-600">
              Built by the community, for the community. Every voice matters in
              shaping our platform.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              💡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Innovation First
            </h3>
            <p className="text-gray-600">
              Continuously evolving with the latest Web3 technologies to serve
              our users better.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Impact So Far
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$2.5M+</div>
              <div className="text-blue-100">Total Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-blue-100">Contributors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Campaigns</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Built with Cutting-Edge Technology
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-bold text-gray-900">Ethereum</h3>
              <p className="text-sm text-gray-600">
                Secure blockchain foundation
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">⚛️</div>
              <h3 className="font-bold text-gray-900">Next.js</h3>
              <p className="text-sm text-gray-600">Modern React framework</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="font-bold text-gray-900">Tailwind</h3>
              <p className="text-sm text-gray-600">
                Beautiful, responsive design
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🔗</div>
              <h3 className="font-bold text-gray-900">wagmi</h3>
              <p className="text-sm text-gray-600">Web3 React hooks</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                👨‍💻
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Alex Chen</h3>
              <p className="text-gray-600 text-sm mb-2">Lead Developer</p>
              <p className="text-gray-500 text-xs">
                Building the future of decentralized funding
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                👩‍🎨
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 text-sm mb-2">UX Designer</p>
              <p className="text-gray-500 text-xs">
                Creating intuitive experiences for global impact
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                👨‍💼
              </div>
              <h3 className="font-bold text-gray-900 mb-1">
                Michael Rodriguez
              </h3>
              <p className="text-gray-600 text-sm mb-2">Community Manager</p>
              <p className="text-gray-500 text-xs">
                Connecting campaigns with their communities
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of changemakers who are already using GlobalFund to
            create positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaigns"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Browse Campaigns
            </Link>
            <Link
              href="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Start Your Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
