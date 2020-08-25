
Pod::Spec.new do |s|
  s.name         = "RNGpsStateListener"
  s.version      = "1.0.0"
  s.summary      = "RNGpsStateListener"
  s.description  = "RNGpsStateListener Description"
  s.homepage     = "RNGpsStateListener"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "freakycoder" => "kurayogun@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/WrathChaos/react-native-gps-state-listener.git", :tag => "master" }
  s.source_files  = "RNGpsStateListener/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  