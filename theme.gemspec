Gem::Specification.new do |spec|
  spec.name     = "simin"
  spec.version  = "1.0.0"
  spec.authors  = ["simin"]
  spec.email    = ["simmmmmmin@gmail.com"]

  spec.summary  = "simin blog custom theme"
  spec.homepage = "https://github.com/choesimin"
  spec.license  = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"

  spec.add_development_dependency "bundler"
end
