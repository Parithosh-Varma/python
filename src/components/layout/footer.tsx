export function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                PyMaster
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The best free Python learning platform. From zero to professional.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">Curriculum</li>
              <li className="hover:text-foreground cursor-pointer">Projects</li>
              <li className="hover:text-foreground cursor-pointer">Quizzes</li>
              <li className="hover:text-foreground cursor-pointer">Roadmap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">Documentation</li>
              <li className="hover:text-foreground cursor-pointer">Cheat Sheets</li>
              <li className="hover:text-foreground cursor-pointer">Blog</li>
              <li className="hover:text-foreground cursor-pointer">Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">About</li>
              <li className="hover:text-foreground cursor-pointer">GitHub</li>
              <li className="hover:text-foreground cursor-pointer">Terms</li>
              <li className="hover:text-foreground cursor-pointer">Privacy</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2026 Python Master Academy. Open source.</p>
          <p className="text-sm text-muted-foreground">Made with <span className="text-red-400">♥</span> for the Python community</p>
        </div>
      </div>
    </footer>
  )
}
